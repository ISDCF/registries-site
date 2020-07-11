const codeColumns = Array.from(document.querySelectorAll('tbody .code'))
const descColumns = Array.from(document.querySelectorAll('tbody .description'))
const rfcColumns = Array.from(document.querySelectorAll('tbody .rfc'))
const useColumns = Array.from(document.querySelectorAll('tbody .use'))
const commentColumns = Array.from(document.querySelectorAll('tbody .comment'))
const rows = Array.from(document.querySelectorAll('tbody tr'))
const descriptions = descColumns.map(({ textContent }) => textContent.toLowerCase())
const codes        = codeColumns.map(({ textContent }) => textContent.toLowerCase())
const rfcs        = rfcColumns.map(({ textContent }) => textContent.toLowerCase())
const uses        = useColumns.map(({ textContent }) => textContent.toLowerCase())
const comments        = commentColumns.map(({ textContent }) => textContent.toLowerCase())

function filter(value) {
  const valueLc = value.toLowerCase()
  descriptions.forEach((desc, i) => {
    const method = (!value || desc.includes(valueLc) || codes[i].includes(valueLc) || rfcs[i].includes(valueLc) || uses[i].includes(valueLc) || comments[i].includes(valueLc)) ? "remove" : "add"
    rows[i].classList[method]('d-none');
  });
}

document.getElementById('search').addEventListener('input', ({ target: { value } }) => filter(value));
