





$(()=>{
    var value;
    var nr = 1;
    
    $('[data-toggle="tooltip"]').tooltip();

    $('button.btn.btn-primary.dodajlek').on('click', ()=>{
        
        
        $('button.btn.btn-primary.dodajlek').before(`
        <div class="form-inline row lek">
                
                <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Pożyczany lek</span>
                    </div>
                    <input type="text" name="lekipoz[0][nazwaleku]" class="form-control" id="lek" aria-describedby="basic-addon3" autocomplete="off" placeholder="Nazwa leku, dawka, wielkosc opakowania" required>
                    
                </div>
                
                
                <div class="input-group mb-3 col-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">Ilość</span>
                    </div>
                    <input type="number" name="lekipoz[<%=numercol++%>][ilosc]" class="form-control" id="ilosc" aria-describedby="basic-addon3" autocomplete="off" placeholder="Ilość opakowań" required>
                </div>
            </div>
        `);
    });
    
    
    
    
});


