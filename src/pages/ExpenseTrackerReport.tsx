import styled from '@emotion/styled';
import { WorkInProgress } from '../components';

const ExpenseTrackerReportPage = () => {
	return (
		<div>
			<Title>Report</Title>
			<WorkInProgress />
		</div>
	);
};

const Title = styled.h2`
	margin-bottom: 16px;
	font-size: var(--fz-h5);
	font-weight: var(--fw-black);
	color: var(--grey900);
`;

export default ExpenseTrackerReportPage;
