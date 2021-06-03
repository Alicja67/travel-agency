/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// TODO - add other action types
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
export const CHANGE_TAGS = createActionName('CHANGE_TAGS');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
// TODO - add other action creators
export const changeDuration = payload => ({payload, type: CHANGE_DURATION});
export const changeTags = payload => ({payload, type: CHANGE_TAGS});

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          [action.payload.type]: Number(action.payload.value),
        },

      };
    case CHANGE_TAGS:
      console.log('action.payload.tag', action.payload.tag);
      return {
        ...statePart,
        tags: (action.payload.checked
          ? [...statePart.tags, action.payload.tag]
          : statePart.tags.filter(tag => tag != action.payload.tag)),
      };
    default:
      return statePart;
  }
}
