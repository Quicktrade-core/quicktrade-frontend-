const FormatPrice = (price) => {
  if(price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(1).replace(/\.0$/, ``)}M`
  }

  return `${price.toLocaleString("en-NG")}`
}

export default FormatPrice