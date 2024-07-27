import PriorityQueue from './PrioryQue.js'; 
import { LinkedList } from "./Linkendlist.js";
import { Place, Connection } from "./Lugar.js";

class Graph {
    constructor() {
        this.places = {};
        this.connections = {};
    }

    addPlace(id, name, description, address, openingHours, type) {
        const place = new Place(id, name, description, address, openingHours, type);
        this.places[id] = place;
        this.connections[id] = new LinkedList(); 
    }

    addConnection(placeId1, placeId2, distance) {
        if (!this.places[placeId1] || !this.places[placeId2]) {
            throw new Error('Uno o dos de los lugares no existe.');
        }

        this.connections[placeId1].añadir({ nodo: placeId2, distancia: distance });
        this.connections[placeId2].añadir({ nodo: placeId1, distancia: distance });
    }

    dijkstra(startId, endId) {
        console.log('Start:', startId, 'End:', endId);
        const distances = {};
        const previous = {};
        const queue = new PriorityQueue();
        const path = [];
        let totalDistance = 0;

       
        for (const id in this.places) {
            distances[id] = id === startId ? 0 : Infinity;
            queue.enqueue(id, distances[id]);
            previous[id] = null;
        }

        while (!queue.isEmpty()) {
            const { element: currentId } = queue.dequeue();
            console.log('Current ID:', currentId);
            if (currentId === endId) break;

            const neighbors = this.connections[currentId].getElements();
            console.log('Neighbors:', neighbors);
            neighbors.forEach(neighbor => {
                const { nodo: neighborId, distancia } = neighbor;
                const newDistance = distances[currentId] + distancia;

                if (newDistance < distances[neighborId]) {
                    distances[neighborId] = newDistance;
                    previous[neighborId] = currentId;
                    queue.enqueue(neighborId, newDistance);
                }
            });
        }

       
        let currentId = endId;
        while (currentId !== null) {
            path.unshift(currentId);
            currentId = previous[currentId];
        }

        totalDistance = distances[endId] === Infinity ? 0 : distances[endId];
        console.log('Path:', path);
        console.log('Total Distance:', totalDistance);
        return { path, totalDistance };
    }
}

export default Graph;
