export default function ( reactDom, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                ${ helmetData.title.toString( ) }
                ${ helmetData.meta.toString( ) }
                <title>Lucky Booking For All :)</title>
                <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow" rel="stylesheet">
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="icon" href="/favicon.ico" type="image/x-icon">
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
            </head>
            <body>
                <div id='mount-point'>${reactDom}</div>
                <script>
                    window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
                </script>
                <script type="text/javascript" src="/app.bundle.js"></script>
                <script type="text/javascript" src="/runtime.bundle.js"></script>
                <script type="text/javascript" src="/vendors.bundle.js"></script>
                <!--<script type="text/javascript" src="/default~app.bundle.js"></script>-->
            </body>
        </html>
    `;
}
