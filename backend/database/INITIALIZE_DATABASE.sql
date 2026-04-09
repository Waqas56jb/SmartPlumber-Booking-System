SELECT 
    'Database Tables Status' as info,
    COUNT(*) as total_tables
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';


SELECT 
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN '✓' ELSE '✗' END as users,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'plumbers') THEN '✓' ELSE '✗' END as plumbers,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'sellers') THEN '✓' ELSE '✗' END as sellers,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN '✓' ELSE '✗' END as products,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'plumber_reviews') THEN '✓' ELSE '✗' END as plumber_reviews,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'seller_reviews') THEN '✓' ELSE '✗' END as seller_reviews,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product_reviews') THEN '✓' ELSE '✗' END as product_reviews;
