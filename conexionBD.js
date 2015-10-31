var mongoose=require('mongoose')
var Consumo=mongoose.model('Consumo');

exports.add = function(request,response){
	var b=request.body;
	
	
	Consumo.findOne({FechaFin:b.FechaFin},function(error,consumo){
		console.log('Consumo encontrado' + consumo)
		//console.log(error)
		if(error){
			response.status(500)
		}else{
			if(consumo===null)
			{
				console.log('añadimos el consumo')
				//Añadir el usuario a la BD
				new Consumo({ Consumo: b.Consumo, Precio: b.Precio, FechaFin: b.FechaFin, Ano:b.Ano }).save(function(error){
					console.log('Error al guardar' + error)
			
					if(error===null)
					{response.status(200).send(true)
					console.log('sinerror')
					}
			        else
			        	response.status(500).send()
console.log('conerror')					
				});
				
			}
			else
				response.status(200).send(false)
				
		}
	});
}

exports.viewAll= function(req, res) {
    Consumo.find({},null,{sort:{FechaFin: 1}},function(err, consumos) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows: ' + consumos)
	//res.header("location: index.html");
        res.status(200).jsonp(consumos);
    });
	 }

exports.getYearList=function(req,res){
	//Consumo.find({},{'Ano':true}, {'distinct': 'Ano'},function(err, consumos) {
	Consumo.find().distinct('Ano',function(err, consumos) {
    if(err) res.send(500, err.message);

    console.log('GET /Anos: ' + consumos)
	//res.header("location: index.html");
        res.status(200).jsonp(consumos);
    })
}
	
exports.getSelectedYears=function(req,res){
	var years = req.body
	console.log(years)
	
	for (var year of years)
		console.log(year)
	
	Consumo.find({'Ano':{$in : years}},null,{sort:{FechaFin: 1}},function(err, consumos) {
    if(err) res.status(500).send(err.message);

    console.log('GET /tvshows: ' + consumos)
	//res.header("location: index.html");
        res.status(200).jsonp(consumos);
    });
}
