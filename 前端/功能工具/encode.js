const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
function encode (str)  {
  return
    encodeURIComponent(str)
      .replace(encodeReserveRE, encodeReserveReplacer)
      .replace(commaRE, ',')
}