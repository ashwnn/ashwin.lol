import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.bepo.ca/');

pb.autoCancellation(false);

export default pb;
