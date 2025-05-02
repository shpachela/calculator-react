export default function calculate(expression) {
  try {
    const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
    const result = Function('"use strict"; return (' + sanitized + ')')();
    return result;
  } catch {
    return 'Error';
  }
}