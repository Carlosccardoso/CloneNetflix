import "./style.css"

function Footer() {
    return (
        <footer>
            <div className="box-pai">
                <div className="box a">
                    <span>Questions? Call 0800 591 3517</span>
                </div>
                <div className="box-a">
                    <div className="a">
                        <span>FAQ</span>
                        <span>Cookie Preferences</span>
                    </div>
                    <div className="a b">
                        <span>
                            Help Center</span>
                        <span>
                            Corporate Information</span>
                    </div>
                    <div className="a b">
                        <span>
                            Terms of Use</span>
                    </div>
                    <div className="a b">
                        <span>Privacy</span>
                    </div>
                </div>
                <div className="box-in">
                    <label class="select">
                        <select>
                            <option value="1">Portugues</option>
                            <option value="2">Ingles</option>
                        </select>
                    </label>
                </div>
            </div>
        </footer>
    )

}

export default Footer