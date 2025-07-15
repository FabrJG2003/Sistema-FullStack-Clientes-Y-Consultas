import PDFDocument from 'pdfkit';
import Document from '../models/document.model.js';
import Client from '../models/client.model.js';
import { PassThrough } from 'stream';
import getStream from 'get-stream';
import concat from 'concat-stream';
import fs from 'fs';
import path from 'path';

export const testPDFGeneration = (req, res) => {
  const doc = new PDFDocument();
  const filePath = path.resolve('./test-output2.pdf'); // Ruta temporal

  doc.pipe(fs.createWriteStream(filePath));

  doc.font('Times-Roman');
  doc.fontSize(20).text('Constancia de Consulta', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Cliente: Prueba Cliente`);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
  doc.text(`Detalles: Este es un test directo en archivo.`);

  doc.end();

  res.status(200).json({ message: 'PDF generado en archivo local temporal.' });
};

export const createDocument = async (req, res) => {
  try {
    const { clienteId, titulo, descripcion } = req.body;
    const cliente = await Client.findById(clienteId);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado." });

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 100, left: 72, right: 72, bottom: 100 }
    });

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    
    doc.on('end', async () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);
        const newDocument = new Document({
          cliente: cliente._id,
          titulo,
          descripcion,
          fecha: new Date(),
          pdf: pdfBuffer
        });

        await newDocument.save();
        res.status(201).json({ 
          message: "Documento creado exitosamente.", 
          id: newDocument._id 
        });
      } catch (err) {
        console.error("Error guardando documento:", err);
        res.status(500).json({ message: "Error guardando documento." });
      }
    });

    const imagePath = path.resolve('./public/hoja_membretada.png');
    if (fs.existsSync(imagePath)) {
      doc.image(imagePath, 0, 0, { width: 600, height: 812 });
    }

    doc.moveDown(2); 

    doc.font('Helvetica-Bold')
       .fontSize(24)
       .text(titulo, { align: 'center' })
       .moveDown(1.5);

    doc.font('Helvetica')
       .fontSize(12)
       .text(`Destinatario: ${cliente.name}`, { continued: false })
       .moveDown(0.5);
    
    const fechaFormateada = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    doc.text(`Fecha: ${fechaFormateada}`)
       .moveDown(2); 

    doc.font('Helvetica')
       .fontSize(12)
       .text('Descripción:', { underline: true })
       .moveDown(0.5);
    
    doc.text(descripcion, {
      align: 'justify',
      indent: 30,
      lineGap: 5
    });

    doc.end();

    // const concatStream = concat(async (pdfBuffer) => {
    //   try {
    //     const newDocument = new Document({
    //       cliente: cliente._id,
    //       fecha: new Date(),
    //       pdf: pdfBuffer
    //     });

    //     await newDocument.save();

    //     console.log("Documento guardado y generado correctamente.");
    //     res.status(201).json({ message: "Documento creado exitosamente.", id: newDocument._id });
    //   } catch (err) {
    //     console.error("Error guardando documento:", err);
    //     res.status(500).json({ message: "Error guardando documento." });
    //   }
    // });

    // doc.pipe(concatStream);  

    // doc.image('./public/hoja_membretada.png', 0, 0, {width: 612, height: 792})
    // doc.moveDown(3);
    // doc.fontSize(20).text('Constancia de Consulta', { align: 'center' });
    // doc.moveDown(2);
    // doc.fontSize(12).text(`Cliente: ${cliente.name}`);
    // doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
    // doc.text(`Detalles: Constancia generada automáticamente`);

    // doc.end();

  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ message: "Error creando documento." });
  }
};

export const getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('cliente');
    if (!document) return res.status(404).json({ message: "Documento no encontrado" });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=documento-${document.cliente.name}.pdf`);
    res.send(document.pdf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocumentsByClient = async (req, res) => {
  try {
    console.log("Hola1")
    const clienteId = req.params.id; 
    console.log("Request Params: ", req.params.id);
    const documents = await Document.find({ 'cliente': req.params.id })
    if(documents.length === 0) {
            console.log('No se encontraron consultas para:', clienteId);
        }
    console.log("Hola2")
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};