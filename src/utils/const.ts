export const UNAUTHORIZED_TOKEN = {
  message: 'You are not authorized to upload a postal',
  error: 'UNAUTHORIZED_TOKEN',
}
export const GET_RESPONSES_OK_SWAGGER = {
    "id": 2,
    "slug": "4f6fc3b9",
    "fromName": "PepeTest",
    "toName": "AnaTest",
    "message": "FelicesFiestas",
    "imageUrl": "https://example-bucket.s3.amazonaws.com/postales/uuid-image-name.png"
}
export const POST_RESPONSES_OK_SWAGGER = {
    "slug": "4f6fc3b9",
   }
export const UPLOAD_BAD_REQUEST_SWAGGER = {
  statusCode: 400,
  timestamp: '2026-01-01T00:00:00.000Z',
  path: '/api/postal/upload',
  message: 'file is required',
};

export const POST_BAD_REQUEST_SWAGGER = {
      statusCode: 400,
      timestamp: '2025-05-01T00:00:00.000Z',
      path: '/api/postal',
      message: 'file is required',
    }
export const GET_NOT_FOUND_SWAGGER = 
  {
    "statusCode": 404,
    "timestamp": "2024-07-06T12:49:14.127Z",
    "path": "/api/postal/12312312",
    "message": "Postal no encontrada"
}
