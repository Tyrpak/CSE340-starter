-- Task One 5.1.

INSERT INTO public.account
(
    account_firstname,
    account_lastname,
    account_email,
    account_password
)
VALUES   (
    'Tony', 
    'Stark', 
    'tony@starkent.com', 
    'Iam1ronM@n'
); 

-- Task One 5.2.

UPDATE public.account 
    SET account_type = 'Admin' 
    WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Task One 5.3.    

DELETE FROM public.account  
    WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Task One 5.4.

UPDATE public.inventory
    SET inv_description = REPLACE (inv_description, 'small interiors', 'large interior')
    WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Task One 5.5.

SELECT
    inv_make,
    inv_model,
    classification_name
FROM
    public.inventory
INNER JOIN public.classification
    ON public.classification.classification_id = 2
    WHERE public.inventory.classification_id = 2;

-- Task One 5.6.

UPDATE public.inventory
    SET inv_image = REPLACE (inv_image, '/images/', '/images/vehicles/'), 
        inv_thumbnail = REPLACE (inv_thumbnail, '/images/', '/images/vehicles/');
