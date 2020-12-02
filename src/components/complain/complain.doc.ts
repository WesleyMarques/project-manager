/**
 * @swagger
 * definitions:
 *   Complain:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       company:
 *         type: string
 *       locale:
 *         type: object
 *         properties:
 *           city:
 *             type: string
 *           provincy:
 *             type: string 
 *           country:
 *             type: string
 *   Error:
 *      type: object
 *      required:
 *        - status
 *        - message
 *      properties:
 *        status:
 *          type: integer
 *          description: HTTP status code
 *          example: 200
 *        message:
 *          type: string
 *          description: Error description
 *          example: Complain created
 */
 

/**
 * @swagger
 * /complains/:
 *   get:
 *     tags:
 *       - Complains
 *     summary: Get all Complains.
 *     description: Get all Complains
 *     parameters:
 *       - name: company
 *         in: query
 *         required: False
 *         schema:
 *           type: string
 *       - name: city
 *         in: query
 *         required: False
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: False
 *         schema:
 *           type: number
 *       - name: perPage
 *         in: query
 *         required: False
 *         schema:
 *           type: number      
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Complain'
 *             example:
 *               [{
 *               id: 1,
 *               title: Complain title,
 *               description: Desc,
 *               company: Company Name,
 *               locale: {city: 'City Name', provincy: 'Provincy Name', country: 'Country Name'}
 *               }]
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Complains
 *     summary: Create a complain.
 *     description: Create a complain
 *     requestBody:
 *       description: complain payload
 *       content: 
 *         'application/json':
 *           schema:
 *             $ref: '#/definitions/Complain'
 *           example:
 *             title: Title 1,
 *             description: Description 1,
 *             company: Company 1,
 *             locale: {
 *                      title: Complain title,
 *                      description: Desc,
 *                      company: Company Name,
 *                      locale: {city: 'City Name', provincy: 'Provincy Name', country: 'Country Name'}
 *                      }
 *     responses:
 *       201:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /complain/{id}:
 *  get:
 *    tags:
 *      - Complains
 *    summary: Find complain by id.
 *    description: Find complain by id
 *    parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: 'string'
 *    responses:
 *       200:
 *         description: Operation executed with success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Complain'
 *             example:
 *               id: 1,
 *               title: Title 1,
 *               description: Description 1,
 *               company: Company,
 *               locale: {city: 'City 1', provincy: 'Provincy 1', country: 'Country 1'}
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 *  put:
 *    tags:
 *      - Complains
 *    summary: Update any complain by id.
 *    description: Update complain by id
 *    parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: 'string'
 *    requestBody:
 *      description: complain payload
 *      content: 
 *        'application/json':
 *          schema:
 *            $ref: '#/definitions/Complain'
 *          example:
 *            id: 1,
 *            title: Title 1,
 *            description: Description 1,
 *            company: Company,
 *            locale: {city: 'City 1', provincy: 'Provincy 1', country: 'Country 1'}
 *    responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Complain"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 *  patch:
 *    tags:
 *      - Complains
 *    summary: Update any property of complain by id.
 *    description: Update any property of complain by id.
 *    parameters:
 *       - name: id
 *         in: path
 *         required: True
 *         schema:
 *           type: 'string'
 *    requestBody:
 *      description: complain payload
 *      content: 
 *        'application/json':
 *          schema:
 *            $ref: '#/definitions/Complain'
 *          example:
 *            title: Title 1,
 *            description: Description 1
 *    responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Complain"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 *  delete:
 *    tags:
 *      - Complains
 *    summary: Delete any complain by id.
 *    description: Delete complain by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: True
 *        schema:
 *          type: 'string'
 *    responses:
 *       204:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /complain/insights:
 *   get:
 *     tags:
 *       - Complains
 *     summary: Get Number of Complains.
 *     description: Get Number of Complains
 *     parameters:
 *       - name: company
 *         in: query
 *         required: False
 *         schema:
 *           type: 'string'
 *       - name: city
 *         in: query
 *         required: False
 *         schema:
 *           type: 'string'
 *       - name: page
 *         in: query
 *         required: False
 *         schema:
 *           type: number
 *       - name: perPage
 *         in: query
 *         required: False
 *         schema:
 *           type: number 
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         content: 
 *           application/json:
 *             schema:
 *               type: number
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
