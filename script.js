'use strict' ;

const objectSimpleGander = {
    gander : {
        1 : {
            number : '1' ,
            name : 'женский'
        } ,
        2 : {
            number : '2' ,
            name : 'мужской'
        }
    } ,
    enumerationGander () {
        let value = '' ;
        for ( let key in this.gander )
            value += `\n- ${this.gander[key].name} (введите ${this.gander[key].number})` ;
        return value ;
    } ,    
    findGander ( value ) {
        for( let key in this.gander )
            if( value === this.gander[key].number ) 
                return this.gander[key].name ;
        return value ;
    }
}

const objectSimpleRole = {
    role : {
        1 : {
            number : '1' ,
            name : 'клинок ночи'
        } ,
        2 : {
            number : '2' ,
            name : 'некромант'
        } ,
        3 : {
            number : '3' ,
            name : 'рыцарь-дракон'
        } ,
        4 : {
            number : '4' ,
            name : 'храмовник'
        } ,
        5 : {
            number : '5' ,
            name : 'хранитель'
        } ,
        6 : {
            number : '6' ,
            name : 'чародей'
        }
    } ,
    enumerationRole () {
        let value = '' ;
        for ( let key in this.role )
            value += `\n- ${this.role[key].name} (введите ${this.role[key].number})` ;
        return value ;
    } ,
    findRole( value ) {
        for( let key in this.role )
            if( this.role[ key ].number === value || this.role[ key ].name === value ) 
                return this.role[key].name ;
    } 
}

const objectSimpleRace = {
    race : {
        1 : {
            number : '1' ,
            name : 'аргонианин' ,
            alliance : 'эбонхартский пакт'
        } ,
        2 : {
            number : '2' ,
            name : 'бретонец' ,
            alliance : 'даггерфольский ковенант'
        } ,
        3 : {
            number : '3' ,
            name : 'высокий эльф' ,
            alliance : 'альдмерский доминион'
        } ,
        4 : {
            number : '4' ,
            name : 'имперец' ,
            alliance : [ 'альдмерский доминион' , 'даггерфольский ковенант' , 'эбонхартский пакт' ]
        } ,
        5 : {
            number : '5' ,
            name : 'каджит' ,
            alliance : 'альдмерский доминион'
        } ,
        6 : {
            number : '6' ,
            name : 'лесной эльф' ,
            alliance : 'альдмерский доминион'
        } ,
        7 : {
            number : '7' ,
            name : 'норд' ,
            alliance : 'эбонхартский пакт'
        } ,
        8 : {
            number : '8' ,
            name : 'орк' ,
            alliance : 'даггерфольский ковенант'
        } ,
        9 : {
            number : '9' ,
            name : 'редгард' ,
            alliance : 'даггерфольский ковенант'
        } ,
        10 : {
            number : '10' ,
            name : 'тёмный эльф' ,
            alliance : 'эбонхартский пакт'
        } 
    } ,
    enumerationRace () {
        let value = '' ;
        for ( let key in this.race )
            value += `\n- ${this.race[key].name} (альянс: ${this.race[ key ].alliance}) (введите ${this.race[key].number})` ;
        return value ;
    } ,
    findRace( value ) {
        let characterRace = undefined , characterAlliance = undefined ;
        for( let key in this.race ) {
            if( this.race[ key ].number === value || this.race[ key ].name === value ) {
                if( Array.isArray( this.race[ key ].alliance ) ) {
                    return {
                        'раса персонажа' : this.race[ key ].name ,
                        'альянс персонажа' : this.findAlliance( this.race[ key ].alliance )
                    }
                }
                else {
                    return {
                        'раса персонажа' : this.race[ key ].name ,
                        'альянс персонажа' : this.race[ key ].alliance
                    }
                }
            }
        }
    } ,
    findAlliance( arrayAlliance ) {
        let characterAlliance, key ;
        do {
            key = 0 ;
            characterAlliance = prompt( `Альянс персонажа:\n- ${arrayAlliance.join( ` (нажмите ${key++})\n- ` )}` )
        } while ( !characterAlliance || !( arrayAlliance.includes( characterAlliance ) || arrayAlliance[ characterAlliance - 1] )) ;
        return arrayAlliance[ characterAlliance - 1] || characterAlliance ;
    }
}

function createCharacter () {
    //-----------------------------------------------создание имени
    let characterName ;                                 
    do {
        characterName = prompt( `Имя персонажа:` ) ;
    } while( !characterName ) ;
    characterName = characterName.trim() ;              
    //-------------------------------------------------------------

    //------------------------------------------------------------------------------------создание пола
    let characterGander ;                               
    do {
        characterGander = prompt( `Пол персонажа:${objectSimpleGander.enumerationGander()}` ) ;
    } while( !characterGander ) ;
    characterGander = objectSimpleGander.findGander( characterGander ) ;
    
    let characterRole ;
    do {
        characterRole = prompt( `Роль персонажа:${objectSimpleRole.enumerationRole()}` ) ;
    } while( !characterRole || !( characterRole = objectSimpleRole.findRole( characterRole ) ) ) ;
    //-------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------создание расы и роли (существует зависимость, только раса "имперцы" могут выбирать альянсы)
    let characterRaceAlliance ;
    do {
        characterRaceAlliance = prompt( `Раса персонажа:${objectSimpleRace.enumerationRace()}` )
    } while( !characterRaceAlliance || !( characterRaceAlliance = objectSimpleRace.findRace( characterRaceAlliance ) )) ;
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    return {
        'имя персонажа' : characterName ,
        'пол персонажа' : characterGander ,
        'роль персонажа' : characterRole ,
        ... characterRaceAlliance
    }

}

const newCharacter = createCharacter() ;

console.log( newCharacter ) ;