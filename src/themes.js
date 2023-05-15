import LoginMan from "./login_manager";

let user_theme = []

export default async function change_theme(root) {
    function rgb2hsv(r, g, b) {
        let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
        let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
        return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
    }

    function rgb2hex(str) {
        let r = 0
        let g = 0
        let b = 0
        let a = 0

        if (str.includes("rgba")) {
            str = str.substr(5, str.length - 6)

            const arr = str.split(", ")
            r = parseInt(arr[0])
            g = parseInt(arr[1])
            b = parseInt(arr[2])
            a = parseInt(arr[3])
        } else if (str.includes("rgb")) {
            str = str.substr(4, str.length - 5)

            const arr = str.split(", ")
            r = parseInt(arr[0])
            g = parseInt(arr[1])
            b = parseInt(arr[2])
            a = 255
        } else {
            return "#00000000"
        }

        return "#" + (r < 16 ? "0" : "") + r.toString(16) + (g < 16 ? "0" : "") + g.toString(16) + (b < 16 ? "0" : "") + b.toString(16) + (a < 16 ? "0" : "") + a.toString(16)
    }

    function ChangeMenubarImg(FgColor) {
        let r = parseInt(FgColor.substr(1, 2), 16)
        let g = parseInt(FgColor.substr(3, 2), 16)
        let b = parseInt(FgColor.substr(5, 2), 16)

        let hsv = rgb2hsv(r / 255, g / 255, b / 255)
        document.querySelector("#HeaderContent > img").style.filter = "hue-rotate(" + hsv[0] + "deg) brightness(" + hsv[1] * 100 + "%) saturate(" + hsv[2] * 100 + "%)"
    }

    function ChangeColors(orginal, new_color) {
        let elems = root.querySelectorAll("*")

        for (let elem of elems) {
            if (elem.tagName == "SELECT") {
                continue
            }

            if (rgb2hex(window.getComputedStyle(elem).color) == orginal) {
                elem.style.color = new_color
            }

            if (rgb2hex(window.getComputedStyle(elem).backgroundColor) == orginal) {
                elem.style.backgroundColor = new_color
            }

            if (rgb2hex(window.getComputedStyle(elem).borderColor) == orginal) {
                elem.style.borderColor = new_color
            }
        }
    }

    if (LoginMan.LoggedIn()) {
        if (user_theme.length == 0) {
            const theme = await LoginMan.getTheme();
            user_theme = theme
        }

        ChangeMenubarImg(user_theme.FgColor)
        ChangeColors("#011e2dff", user_theme.BaseColor)
        ChangeColors("#444444ff", user_theme.BgColor)
        ChangeColors("#333333ff", user_theme.BgColorDark)
        ChangeColors("#222233ff", user_theme.BgColorTheme)
        ChangeColors("#33333eff", user_theme.BgColorTilted)
        ChangeColors("#2e2e6555", user_theme.BtnHoverColor)
        ChangeColors("#f4f4ffff", user_theme.BtnHoverTextColor)
        ChangeColors("#a334e8ff", user_theme.FgColor)
        ChangeColors("#630f78ff", user_theme.FgColorDark)
        ChangeColors("#ffffffff", user_theme.TextColor)
        ChangeColors("#f5f5f5ff", user_theme.TextColorDark)
        ChangeColors("#add8e6ff", user_theme.TextColorTilted)

        let reacts = document.querySelectorAll(".ReactionContainer")
        for(let r of reacts){
            r.style.borderColor = user_theme.FgColor
            r.style.backgroundColor = user_theme.BgColorDark
        }
        reacts = document.querySelectorAll(".ReactionContainer span")
        for(let r of reacts){
            r.style.color = user_theme.TextColor
        }

        reacts = document.querySelectorAll(".Reacted")
        for(let r of reacts){
            r.style.backgroundColor = user_theme.TextColor
        }
        reacts = document.querySelectorAll(".Reacted span")
        for(let r of reacts){
            r.style.color = user_theme.FgColor
        }

        let hovers = document.getElementsByClassName("HeaderHover")
        for(let h of hovers){
            h.onmouseover = () => {
                h.style.backgroundColor = user_theme.BtnHoverTextColor
                h.style.color = user_theme.BaseColor
            }

            h.onmouseout = () => {
                h.style.backgroundColor = user_theme.BgColorTilted
                h.style.color = ""
            }
        }

        hovers = document.getElementsByClassName("BtnHover")
        for(let h of hovers){
            h.onmouseover = () => {
                h.style.backgroundColor = user_theme.BtnHoverColor
            }

            h.onmouseout = () => {
                h.style.backgroundColor = user_theme.BgColor
            }
        }

        hovers = document.getElementsByClassName("Button")
        for(let h of hovers){
            h.onmouseover = () => {
                h.style.backgroundColor = user_theme.BtnHoverColor
                h.style.color = user_theme.BtnHoverTextColor
            }

            h.onmouseout = () => {
                h.style.backgroundColor = ""
                h.style.color = ""
            }
        }

        hovers = document.getElementsByClassName("CoolButtonCb")
        for(let h of hovers){
            h.onchange = () => {
                if(h.value){
                    h.style.backgroundColor = user_theme.FgColor
                    h.style.color = user_theme.TextColor
                }else{
                    h.style.backgroundColor = ""
                    h.style.color = ""
                }
            }
        }
    } else {
        ChangeMenubarImg("#a334e8ff")
    }
}