import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalLayout, ModalDataType } from '..';
import { Button, DatePicker, TagsInput, TextInput, editTodoItemFormSchema, EditTodoItemFormSchema } from '../..';
import type { Todo } from '../../../supabase';
import { today } from '../../../utils';
import { isEqual } from 'es-toolkit';
import { useToastStore } from '../../../store';
import { toastData } from '../../../constants';

interface TodoItemEditModal {
	id: string;
	type: ModalDataType;
	onClose: () => void;
	data: Todo;
}

const TodoItemEditModal = ({ id, type, onClose, data: { content, tags, reminder_time } }: TodoItemEditModal) => {
	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm<EditTodoItemFormSchema>({
		resolver: zodResolver(editTodoItemFormSchema),
		defaultValues: {
			content: content,
			tags: tags?.length ? tags!.map((tag, idx) => ({ id: idx, tag })) : [],
			reminderTime: reminder_time ?? today,
		},
	});

	const { addToast } = useToastStore();

	const onSubmit = async (formData: EditTodoItemFormSchema) => {
		if (isEqual({ ...formData, tags: formData.tags.map(tag => tag) }, { content, tags, reminderTime: reminder_time ?? today })) {
			addToast(toastData.TODO_REMINDER.EDIT.WARN);
			return;
		}

		try {
			await (() => {})();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<ModalLayout id={id} type={type} title={'Detail'} onClose={onClose}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<TextInput errorMessage={errors?.content?.message}>
					<TextInput.TextField id="todoItem_editModal_content" {...register('content')} placeholder="Change content" variant="lg" />
				</TextInput>
				<Controller
					name="tags"
					control={control}
					render={({ field: { name, value, onChange } }) => <TagsInput inputId={name} tags={value} onChange={onChange} />}
				/>
				<DatePicker
					selected={watch('reminderTime')}
					setSelected={(date: Date) => setValue('reminderTime', date, { shouldValidate: true })}
					error={errors['reminderTime']}
				/>
				<ButtonGroup>
					<DeleteButton type="button">Delete</DeleteButton>
					<SubmitButton type="submit">Edit</SubmitButton>
				</ButtonGroup>
			</Form>
		</ModalLayout>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	margin-top: 32px;
`;

const DeleteButton = styled(Button)`
	padding: var(--padding-container-mobile);
	width: 100%;
	color: var(--white);
	background-color: var(--grey300);
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);

	&:hover {
		background-color: var(--grey200);
	}
`;

const SubmitButton = styled(Button)`
	/* margin-top: auto; */
	padding: var(--padding-container-mobile);
	width: 100%;
	color: var(--white);
	background-color: var(--black);
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);

	&:hover {
		background-color: var(--grey900);
	}
`;

export default TodoItemEditModal;
