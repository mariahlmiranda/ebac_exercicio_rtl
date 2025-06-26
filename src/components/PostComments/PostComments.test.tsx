import { fireEvent, render, screen } from '@testing-library/react';
import Post from '.';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve permitir inserir um comentário', () => {
        render(<Post/>);
        
        const textarea = screen.getByTestId('comment-textarea');
        const submitButton = screen.getByTestId('comment-submit-button');
        
        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(submitButton);
        
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByTestId('comment-0')).toBeInTheDocument();
    });

    it('Deve permitir inserir dois comentários', () => {
        render(<Post/>);
        
        const textarea = screen.getByTestId('comment-textarea');
        const submitButton = screen.getByTestId('comment-submit-button');
        
        // Inserir primeiro comentário
        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(submitButton);
        
        // Inserir segundo comentário
        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(submitButton);
        
        // Verificar se ambos os comentários estão presentes
        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();
        expect(screen.getByTestId('comment-0')).toBeInTheDocument();
        expect(screen.getByTestId('comment-1')).toBeInTheDocument();
        
        // Verificar se a lista tem exatamente 2 comentários
        const commentsList = screen.getByTestId('comments-list');
        expect(commentsList.children).toHaveLength(2);
    });

    it('Deve limpar o textarea após inserir um comentário', () => {
        render(<Post/>);
        
        const textarea = screen.getByTestId('comment-textarea') as HTMLTextAreaElement;
        const submitButton = screen.getByTestId('comment-submit-button');
        
        fireEvent.change(textarea, { target: { value: 'Comentário teste' } });
        fireEvent.click(submitButton);
        
        expect(textarea.value).toBe('');
    });

    it('Deve ter os elementos com data-testid corretos', () => {
        render(<Post/>);
        
        expect(screen.getByTestId('post-comments-container')).toBeInTheDocument();
        expect(screen.getByTestId('comments-list')).toBeInTheDocument();
        expect(screen.getByTestId('comment-form')).toBeInTheDocument();
        expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
        expect(screen.getByTestId('comment-submit-button')).toBeInTheDocument();
    });
});