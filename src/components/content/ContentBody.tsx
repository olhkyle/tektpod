import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { Diary } from '../../supabase/schema';
import { getSingleDiary } from '../../supabase/diary';
import { LoadingSpinner, Button } from '..';
import useRemoveDiaryMutation from '../../hooks/mutations/useRemoveDiaryMutation';
import useModalStore from '../../store/useModalStore';
import queryKey from '../../constants/queryKey';
import { MODAL_CONFIG } from '../modal/modalType';

const ContentBody = () => {
	const { diaryId } = useParams();

	const { data } = useSuspenseQuery<Diary>({ queryKey: [...queryKey.DIARY, diaryId], queryFn: () => getSingleDiary(diaryId!) });
	const { mutate: remove, isPending } = useRemoveDiaryMutation();

	const { setModal } = useModalStore();

	const handleEditContentModalClick = () =>
		setModal({
			Component: MODAL_CONFIG.DIARY.EDIT?.Component,
			props: { type: 'diary', data },
		});

	const handleDeleteDiaryClick = () => remove({ id: diaryId! });

	return (
		<>
			<EditButton type="button" onClick={handleEditContentModalClick}>
				Edit
			</EditButton>
			<Description>
				<Title>{data?.title}</Title>
				<ContentList>
					{data?.content
						.split('-')
						.filter(item => item !== '')
						.map((item, idx) => (
							<div key={`${item}_${idx}`}>✹ {item}</div>
						))}
				</ContentList>
				<Feeling>⚡️ {data?.feeling}</Feeling>
			</Description>

			<DeleteButton type="button" onClick={handleDeleteDiaryClick}>
				{isPending ? <LoadingSpinner /> : 'Delete'}
			</DeleteButton>
		</>
	);
};

const EditButton = styled(Button)`
	margin-left: auto;
	padding: calc(var(--padding-container-mobile) * 0.75) var(--padding-container-mobile);
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);
	color: var(--grey700);
	background-color: var(--greyOpacity50);
	border: 1px solid var(--greyOpacity200);
	border-radius: var(--radius-s);

	&:hover,
	&:active {
		background-color: var(--greyOpacity100);
	}
`;

const Description = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: calc(100dvh / 25);
	padding: calc(var(--padding-container-mobile) * 2) var(--padding-container-mobile);
	width: 100%;
	border: 1px solid var(--greyOpacity200);
	border-radius: var(--radius-s);
`;

const Title = styled.h2`
	font-size: var(--fz-h4);
	font-weight: var(--fw-black);
`;

const ContentList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin: 16px 0;
	font-size: var(--fz-h7);
`;

const Feeling = styled.p`
	padding: var(--padding-container-mobile);
	font-weight: var(--fw-semibold);
	color: var(--blue200);
	background-color: var(--blue100);
	border: 1px solid var(--blue300);
	border-radius: var(--radius-s);
`;

const DeleteButton = styled(Button)`
	position: absolute;
	bottom: 0;
	padding: var(--padding-container-mobile);
	width: 100%;
	min-height: 57px;
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);
	color: var(--white);
	background-color: var(--black);

	&:focus {
		background-color: var(--grey900);
	}
`;

export default ContentBody;
