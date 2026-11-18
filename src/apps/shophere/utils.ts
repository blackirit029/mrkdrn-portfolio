const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })

export const formatPrice = (value: number) => peso.format(value)

/** 12400 → "12.4k" */
export const formatSold = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : String(value)

export const discountPercent = (price: number, originalPrice?: number) =>
  originalPrice && originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0
