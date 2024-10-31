import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { Header, BottomNav, LayoutLoadingSpinner } from '.';
import { ModalContainer } from '..';
import { useInitialScrollToTop } from '../../hooks';

const layoutCss = {
	wrapper: css`
		max-width: var(--max-app-width);
		min-width: var(--min-app-width);
		margin: 0 auto;
		overflow: hidden;
	`,
	main: css`
		min-height: calc(100dvh - 2 * var(--nav-height));
		margin: var(--nav-height) 0;
		padding: var(--padding-container-mobile);
		background-color: var(--white);
	`,
};

const Layout = () => {
	const layoutRef = useRef<HTMLDivElement>(null);
	const [, setGlobalWidth] = useState('');

	useInitialScrollToTop();

	useEffect(() => {
		if (layoutRef.current) {
			setGlobalWidth(`${layoutRef.current.clientWidth}px`);
		}
	}, [setGlobalWidth]);

	return (
		<Suspense fallback={<LayoutLoadingSpinner />}>
			<div ref={layoutRef} css={layoutCss.wrapper}>
				<Header />
				<main css={layoutCss.main}>
					<Outlet />
				</main>
				<BottomNav />
				<ModalContainer />
			</div>
		</Suspense>
	);
};

export default Layout;
