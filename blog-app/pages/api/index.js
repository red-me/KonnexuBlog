const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : '';
const next_url = process.env.NEXT_PUBLIC_API_URL

export const queryPost = async (query) => {
  try {
    const response = await fetch(`${next_url}/api/post/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ document: 'post', query })
    });
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}

export const mutatePost = async (dataObj) => {
  let q = {}
  if (dataObj.type === 'update') {
    q = {
      where: { id: Number(dataObj.id) },
      data: {
        description: dataObj.description,
        title: dataObj.title,
        content: dataObj.content,
      }
    }
  }
  if (dataObj.type === 'create') {
    q = {
      data: {
        description: dataObj.description,
        title: dataObj.title,
        type: 'blog',
        content: dataObj.content,
        published: dataObj.published,
        author: { connect: { email: dataObj.authorEmail } },
      }
    }
  }
  if (dataObj.type === 'update delete') {
    dataObj.type = 'update'
    q = {
      where: { id: Number(dataObj.id) },
      data: {
        deleted: true,
      }
    }
  }
  try {
    const response = await fetch(`${next_url}/api/post/mutate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ document: 'post', type: dataObj.type, query: q })
    });
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}

export const queryCategories = async (query) => {
  try {
    const response = await fetch(`${next_url}/api/postcategories/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}