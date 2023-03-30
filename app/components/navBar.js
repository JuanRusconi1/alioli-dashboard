import Link from "next/link";
import "../../styles/navBar.css"
import { Caveat } from "@next/font/google";

const caveat = Caveat({
    weigth: ['800'],
    preload: false
  })

export default function NavBar () {
    return (
        <section className="div-principal-navBar">
            <div className="div-logo-navBar">
                <p className={caveat.className}>Ali Oli</p>
                <span className="p-dashboard">Dashboard</span>
            </div>
            <div className="div-links-navBar">
                <Link href="/principal">
                    <p className="link">Principal</p>
                </Link>
                <Link href="/comandas">
                    <p className="link">Comandas</p>
                </Link>
                <Link href="/productos">
                    <p className="link">Productos</p>
                </Link>
            </div>
        </section>
    )
}