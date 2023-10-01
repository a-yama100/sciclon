// E:\programming\Project\sciclon\components\Footer.tsx

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white p-4 text-center mt-3">
            <p>&copy; {currentYear} Sciclon. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
