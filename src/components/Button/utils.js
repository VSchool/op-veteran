export function setStyle(style) {
    if (style === 'primary') {
        return {
            background: `#618572`,
            border: `2px solid #618572`,
            fontColor: `#FFFFFF`,
            boxShadow: `0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
        }
    } else if (style === 'secondary') {
        return {
            background: `#FFFFFF`,
            border: `2px solid #618572`,
            fontColor: `#618572`,
            boxShadow: `0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
        }
    } else if (style === 'text') {
        return {
            background: `none`,
            border: `none`,
            fontColor: `#618572`,
            boxShadow: `none`
        }
    }
}