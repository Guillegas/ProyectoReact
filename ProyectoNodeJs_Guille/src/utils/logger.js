const logMensaje = (mensaje, error) => {
  console.error(`[ERROR] ${mensaje}`, error);
};

module.exports = { logMensaje };