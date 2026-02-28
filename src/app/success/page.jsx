'use client'
import Link from "next/link"
import "./success.css"

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1 className="success-title">¡Gracias por tu compra!</h1>

        <p className="success-text">
          Agradecemos tu preferencia.
          <br />
          Si tienes alguna pregunta, escríbenos a{" "}
          <a
            className="success-link"
            href="mailto:orders@example.com"
          >
            orders@example.com
          </a>
          <br />
          <Link className="success-link" href="/" >Regresar</Link>
        </p>
      </div>
    </div>
  )
}

export default Success