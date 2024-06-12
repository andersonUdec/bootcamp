
export default function FooterComponent() {
    const currentYear = new Date().getFullYear()
    return (
        <footer>
            <p>Derechos de Autor &copy; {currentYear}. Todos los derechos reservados.</p>
        </footer>
    );
}