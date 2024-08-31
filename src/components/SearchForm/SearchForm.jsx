import css from './SearchForm.module.css';

export const SearchForm = ({ handleSubmit }) => {
    return (
        <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.input} autoComplete="off" autoFocus type="text" name="query" placeholder="" />
                <button type="submit" className={css.btn}>
                    Search
                </button>
            </form>
    );
};