
class Place {
    constructor(id, name ,description, address , openingHours , type) {
        this.id = id;
        this.name = name;
        this.description=description;
        this.address=address;
        this.openingHours=openingHours;
        this.type=type;
    }
}


class Connection {
    constructor(placeId1, placeId2, distance) {
        this.placeId1 = placeId1;
        this.placeId2 = placeId2;
        this.distance = distance; 
    }
}

export {Place , Connection}


