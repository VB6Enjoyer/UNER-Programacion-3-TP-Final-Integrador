const estadisticaBD = require('../baseDatos/estadisticaBD');

estadistica = async (req, res) => {
    const estadistica = await estadisticaBD.estadistica();    
    res.status(200).json({estado:'OK', dato:estadistica});    
}

estadistica2 = async (req, res) => {
    const estadistica = await estadisticaBD.estadistica2(1);    
    res.status(200).json({estado:'OK', dato:estadistica});    
}

module.exports = {
    estadistica,
    estadistica2
}