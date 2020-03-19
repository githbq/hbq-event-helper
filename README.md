# event-helper

EventHelper support nodejs and browser environment

![my love](./logo.png)

## Installation

    yarn add event-helper


# Usage
```javascript
//in js
import EventHelper  from 'event-helper' 

const eventInstance=EventHelper.create()

```

## API

### on(name,action)

    add event

### off(name,action?)

    remove event

### once(name,action)

    add evnet for one time

### emit(name:string|string[])

    emit event by name or name array

### has(name:string)

    check event name exists

### first(name:string,action)

    remove events of name
    then add action of the same name

### create()

    create a instance of event-helper

----

this all you can use functions,thanks



