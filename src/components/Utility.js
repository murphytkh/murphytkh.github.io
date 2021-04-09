import {useState, useRef} from "react";

// objects for storing data

class NotificationObject
{
    constructor(title, description, rectify)
    {
        this.title = title;
        this.description = description;
        this.rectify = rectify;
    }
}

class PageObject
{
    constructor(index, active, value, style, id)
    {
        this.index = index;
        this.active = active;
        this.value = value;
        this.style = style;
        this.id = id;
    }
}

class UserObject
{
    constructor(name, role, image)
    {
        this.name = name;
        this.role = role;
        this.image = image;
    }
}

class ActiveLightObject
{
    constructor(id, detections, date, time, stats)
    {
        this.id = id;
        this.detections = detections;
        this.date = date;
        this.time = time;
        this.stats = stats;
    }
}

class ActivityObject
{
    constructor(user, action)
    {
        this.user = user;
        this.action = action;
    }
}

class LightStatusObject
{
    constructor(name, location, date, time, status)
    {
        this.name = name;
        this.location = location;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}

class Light
{
    constructor(name, pos)
    {
        this.name = name;
        this.pos = pos;
    }
}

class SceneDataObject
{
    constructor(img, lights)
    {
        this.img = img;
        this.lights = lights;
    }
}

// utility functions
function Rad(deg)
{
    return deg * Math.PI / 180;
}

// use this if using states in DOM event handlers
// it would allow you to get the updated state
// note: use .current to access the data
function useRefState(initial)
{
    const [state, setState] = useState(initial);
    const ref = useRef(state);

    const setRefState = val =>
    {
        ref.current = val;
        setState(val);
    };

    return [ref, setRefState];
}

function saveObj(obj, name)
{
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

export {NotificationObject, PageObject, UserObject, ActiveLightObject, 
        ActivityObject, LightStatusObject, Light, SceneDataObject, Rad,
        useRefState, saveObj};