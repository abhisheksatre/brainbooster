export function $(selector, context) {
    return (context || document).querySelector(selector);
}