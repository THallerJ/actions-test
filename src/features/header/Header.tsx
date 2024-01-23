"use client";
import styles from "./header.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";

const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Guitar Tab</h1>
			<AuthManager />
		</header>
	);
};

export default Header;

const AuthManager = () => {
	const { user } = useUser();

	return !user ? (
		<div className={styles.auth}>
			<a href="/api/auth/login">Login</a>
			<a href="/api/auth/signup">Sign Up</a>
		</div>
	) : (
		<>
			<span>
				Hello, {user.name}. Your email is {user.email}.
			</span>
			<a href="/api/auth/logout">Logout</a>
		</>
	);
};
