import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard (props) {
    return (
        <article className='article-producto'>
            <div className='div-imagen-producto'>
                <Image
                    className='imagen-producto'
                    src={props.image}
                    alt='imagen de producto'
                    width={250}
                    height={200}
                />
            </div>
            <div className='div-p'>
            <p className='p-nombre-producto'>
                {props.name}
            </p>
            <p className='p-precio-producto'>
                ${props.price}
            </p>
            </div>
            <div className='div-botones-producto'>
                <button className='boton-eliminar'>Eliminar</button>
                <Link className='boton-modificar' href="/productos">Modificar</Link>
            </div>
        </article>
  );
}