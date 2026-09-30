import React, { useState } from 'react';

type AddTodoComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const AddTodoComponent: React.FC<AddTodoComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'todo': '',
        'category': '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit?.(formData);
    };

    return (
        <div className="modern-container">
            <div className="modern-card">
                <div className="container">
        	Your New Action Item:
        	<form onSubmit={handleSubmit} method="POST" action="/add-todo.do">
        		<fieldset className="form-group">
        			<label>Description</label> <input name="todo" type="text" className="form-control" /> <BR />
        		</fieldset>
        		<fieldset className="form-group">
        			<label>Category</label> <input name="category" type="text" className="form-control" /> <BR />
        		</fieldset>
        		<input name="add" type="submit" className="btn btn-success" value="Submit" />
        	</form>
        </div>
            </div>
        </div>
    );
};

export default AddTodoComponent;
