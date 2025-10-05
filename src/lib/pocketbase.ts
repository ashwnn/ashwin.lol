import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.bepo.ca/');

// Disable auto-cancellation to allow multiple requests
pb.autoCancellation(false);

export default pb;
