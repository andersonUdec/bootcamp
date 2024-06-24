export default function FooterComponent() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="py-6 text-center">
            <p>Derechos de Autor &copy; {currentYear}. Todos los derechos reservados.</p>
        </footer>
    );
}