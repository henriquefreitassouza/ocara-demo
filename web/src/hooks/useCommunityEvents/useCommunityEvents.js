function useCommunityEvents(events) {
  const today = Date.now();
  let dateDiff, dateDiffPrevious, eventDate, previousEventDate = null;
  let next = null;
  let previous = [];

  if (Array.isArray(events) && events.length > 0) {
    events.map((evt) => {
      eventDate = new Date(evt.date);

      if (!dateDiff) previousEventDate = eventDate;

      dateDiff = today - eventDate;
      dateDiffPrevious = today - previousEventDate;

      if ((eventDate >= today) &&
          (dateDiff >= dateDiffPrevious)) next = evt;
      else if (eventDate < today) previous.push(evt);

      previousEventDate = eventDate;
      return null;
    });
  }

  return [next, previous];
}

export default useCommunityEvents;
