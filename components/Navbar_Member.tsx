// E:\programming\Project\sciclon\components\Navbar.tsx

import Link from 'next/link';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#004d40' }}>
            <Link href="/" className="navbar-brand">
                Sciclon
            </Link>
            <button 
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/questions" className="nav-link">
                            用語と解説
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/users/dashboard" className="nav-link">
                            ダッシュボード
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="d-lg-none">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/users/register" className="nav-link">
                            新規登録
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/users/login" className="nav-link">
                            ログイン
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
