import React from "react";

import {
  Page,
  Text,
  Document,
  StyleSheet,
  Font,
  Canvas,
} from "@react-pdf/renderer";

import { Link } from "react-router-dom";

//reactstrap import
import { Card, CardHeader, Table, Button } from "reactstrap";
// import { getAllEmployee } from "../../../../Transaction Management back-end/controllers/employeeController";

function ProductReport() {
  return (
    <Document style={styles.document}>
      <Page style={styles.body}>
        {/* <Canvas>
          <Card className="shadow">
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">item</th>
                  <th scope="col">sales</th>
                  <th scope="col">profit</th>
                </tr>
              </thead>
            </Table>
          </Card>
        </Canvas> */}

        <Text style={styles.text}>
          En resolución, él se enfrascó tanto en su lectura, que se le pasaban
          las noches leyendo de claro en claro, y los días de turbio en turbio,
          y así, del poco dormir y del mucho leer, se le secó el cerebro, de
          manera que vino a perder el juicio. Llenósele la fantasía de todo
          aquello que leía en los libros, así de encantamientos, como de
          pendencias, batallas, desafíos, heridas, requiebros, amores, tormentas
          y disparates imposibles, y asentósele de tal modo en la imaginación
          que era verdad toda aquella máquina de aquellas soñadas invenciones
          que leía, que para él no había otra historia más cierta en el mundo.
        </Text>
        <Text style={styles.subtitle} break>
          Capítulo II: Que trata de la primera salida que de su tierra hizo el
          ingenioso Don Quijote
        </Text>
        <Text style={styles.text}>
          Yendo, pues, caminando nuestro flamante aventurero, iba hablando
          consigo mesmo, y diciendo: —¿Quién duda, sino que en los venideros
          tiempos, cuando salga a luz la verdadera historia de mis famosos
          hechos, que el sabio que los escribiere no ponga, cuando llegue a
          contar esta mi primera salida tan de mañana, desta manera?: Apenas
          había el rubicundo Apolo tendido por la faz de la ancha y espaciosa
          tierra las doradas hebras de sus hermosos cabellos, y apenas los
          pequeños y pintados pajarillos con sus arpadas lenguas habían saludado
          con dulce y meliflua armonía la venida de la rosada Aurora, que,
          dejando la blanda cama del celoso marido, por las puertas y balcones
          del manchego horizonte a los mortales se mostraba, cuando el famoso
          caballero don Quijote de la Mancha, dejando las ociosas plumas, subió
          sobre su famoso caballo Rocinante y comenzó a caminar por el antiguo y
          conocido Campo de Montiel.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  document: {
    width: "50%",
    height: "500px",
    margin: "0 auto",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default ProductReport;
