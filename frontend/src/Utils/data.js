export const userquery = (userId)=>{
    const query =`*[_type=="user" && _id == '${userId}']`;
    return query;
}
export const categories = [
    {
      name: 'Cars',
      image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
    },
    {
      name: 'Gaming',
      image:'data:image/jpeg;base64,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'
    },
    {
      name: 'Fitness',
      image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
    },
    {
      name: 'Wallpaper',
      image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
    },
    {
      name: 'Websites',
      image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
    },
    {
      name: 'Photo',
      image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
    },
    {
      name: 'Food',
      image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
    },
    {
      name: 'Nature',
      image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
    },
    {
      name: 'Art',
      image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
    }, {
      name: 'Travel',
      image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
    },
    {
      name: 'Quotes',
      image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
    }, {
      name: 'Cats',
      image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
    }, {
      name: 'Dogs',
      image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
    },
    {
      name: 'Others',
      image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
  ];
export const searchQuery = (searchTerm)=>{
    const query =`*[_type=='pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || description match '${searchTerm}*']{
        image{
            asset->{
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            username,
            image
        },
        save[]{
            _key,
            postedBy ->{
                _id,
                username,
                image
            },
        },
    }`
    return query;
}
export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    description,
    category,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
   save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
    comment[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};
export const feedQuery = `*[_type=='pin'] | order(_createdAt,desc){
    image{
        asset->{
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        username,
        image
    },
    save[]{
        _key,
        postedBy ->{
            _id,
            username,
            image
        },
    },
}`
export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};