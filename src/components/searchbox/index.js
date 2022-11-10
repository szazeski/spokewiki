import style from "../../routes/home/style.css";


const Searchbox = () => {

    return (
        <div className={style.searchbox}>
            <label> search for articles about
                <input name="search" onChange={search} disabled={true}/>
            </label>
        </div>
    )

}
export default Searchbox