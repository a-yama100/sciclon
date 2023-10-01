// E:\programming\Project\sciclon\components\Header.tsx

import Link from 'next/link';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/" className="navbar-brand">
                Sciclon
            </Link>
            {/* その他のナビゲーションリンク */}
        </nav>
    );
}

export default Header;
