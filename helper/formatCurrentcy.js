function formatCurrentcy(value) {
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  
  module.exports = formatCurrentcy;
  