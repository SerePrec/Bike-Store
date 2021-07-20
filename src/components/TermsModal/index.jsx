import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./TermsModal.scss";

const TermsModal = ({ showModal, handleCloseModal }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      dialogClassName="termsModal"
      size="lg"
      centered
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>TERMINOS Y CONDICIONES</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="termsModalImg"></div>
        <article className="terms">
          <h3>Mammoth, términos y condiciones</h3>
          <p>
            <strong>Mammoth SA</strong> es responsable del tratamiento de los
            datos de carácter personal, con el fin de responderte todas las
            solicitudes que realices a través de nuestro formulario de contacto
            en la página web, gestionar las operaciones comerciales que se
            realicen por medio de ella y las obligaciones que se deriven de las
            mismas. Mediante la aceptación de Términos y Condiciones el usuario
            consiente explícitamente el uso de sus datos personales para la
            elaboración de perfiles, análisis y estadísticas sobre la
            utilización del sitio web, como así también determinar los gustos y
            preferencias de los usuarios para remitir información comercial o
            promocional acorde.
          </p>
          <ol>
            <li>
              <p>
                Envío de información comercial: <strong>Mammoth SA</strong>{" "}
                podría remitirle información comercial siempre que se haya
                suscrito al Newsletter, previo consentimiento o mediante la
                inscripción del correo electrónico en el apartado
                correspondiente. Podrán enviarse comunicaciones comerciales y
                publicitarias, por los distintos medios, de acuerdo al
                comportamiento del usuario y las preferencias o gustos del
                mismo, elaborando perfiles.
              </p>
            </li>
            <li>
              <p>
                Plazo o criterio de conservación de los datos: Los datos
                personales proporcionados se conservarán mientras se mantenga la
                relación de prestación del servicio, hasta que solicite la
                supresión por parte del interesado o durante los años necesarios
                para cumplir con las obligaciones legales. Posteriormente, los
                datos serán suprimidos conforme a lo dispuesto en la normativa
                en materia de protección de datos, lo que implica su bloqueo,
                estando disponibles tan solo a solicitudes de Jueces y
                Tribunales, Defensor del Pueblo, Ministerio Fiscal o las
                Administraciones Públicas competentes durante el plazo de
                prescripción de acciones que pudieran derivar y, transcurrido
                este tiempo, se procederá a su completa eliminación.
              </p>
            </li>
            <li>
              <p>
                Legitimación para el tratamiento de los datos: La base legal es
                la necesidad del tratamiento para la ejecución del contrato de
                compraventa y posterior cumplimiento de las obligaciones
                contractuales y extracontractuales y el consentimiento del
                cliente para el envío de información comercial a través de la
                suscripción al Newsletter.
              </p>
            </li>
            <li>
              <p>
                Cesión o comunicación de los datos: Además, los datos se cederán
                a terceros en los casos en los que exista una obligación legal.
                A entidades financieras o de préstamo con el fin de financiar la
                compra de productos si así se solicita. Además, pueden cederse
                datos de clientes a otras empresas directamente relacionadas con{" "}
                <strong>Mammoth SA</strong> debido al interés legítimo del
                responsable.
              </p>
            </li>
            <li>
              <p>
                Derechos de los afectados: cualquier persona tiene derecho a
                obtener confirmación sobre si en <strong>Mammoth SA</strong> se
                están tratando sus datos personales. Las personas interesadas
                tienen derecho a: solicitar el acceso a los datos personales
                relativos al interesado, solicitar su rectificación o supresión,
                solicitar la limitación de su tratamiento, oponerse al
                tratamiento, solicitar la portabilidad de los datos. Los
                interesados podrán acceder a sus datos personales, así como a
                solicitar la rectificación de los datos inexactos o, en su caso,
                solicitar su supresión cuando, entre otros motivos, los datos ya
                no sean necesarios para los fines que fueron recogidos. En
                determinadas circunstancias, los interesados podrán solicitar la
                limitación del tratamiento de sus datos, en cuyo caso únicamente
                los conservaré para el ejercicio o la defensa de reclamaciones.
                En determinadas circunstancias y por motivos relacionados con su
                situación particular, los interesados podrán oponerse al
                tratamiento de sus datos, <strong>Mammoth SA</strong> dejará de
                tratar los datos, salvo por motivos legítimos imperiosos, o el
                ejercicio o la defensa de posibles reclamaciones. También podrán
                solicitar la portabilidad de sus datos.
              </p>
            </li>
            <li>
              <p>
                Procedencia u origen de datos de carácter personal: los datos
                personales que se tratan en <strong>Mammoth SA</strong> proceden
                del propio interesado. Las categorías de datos que se tratan
                son: datos de carácter identificativo y datos económicos y
                bancarios.
              </p>
            </li>
            <li>
              <p>
                Reclamo ante la autoridad de control: podrá presentar
                reclamación ante la Autoridad de Control en materia de
                Protección de Datos competente, especialmente cuando no haya
                obtenido satisfacción en el ejercicio de sus derechos.
              </p>
            </li>
          </ol>
        </article>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
