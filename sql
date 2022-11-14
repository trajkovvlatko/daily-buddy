INSERT INTO `Note` (`id`, `parentId`, `title`, `content`, `UserId`) VALUES
    (1, 0, '', 'content 1', 1),
    (2, 1, 'bin', 'content 2', 1),
    (3, 1, 'etc', 'content 3', 1),
    (4, 1, 'home', 'content 4', 1),
    (5, 1, 'tmp', 'content 5', 1),
    (6, 1, 'usr', 'content 6', 1),
    (7, 1, 'var', 'content 7', 1),
    (8, 3, 'apache2', 'content 8', 1),
    (9, 3, 'apt', 'content 9', 1),
    (10, 3, 'mysql', 'content 10', 1),
    (11, 8, 'conf-available', 'content 11', 1),
    (12, 8, 'mods-available', 'content 12', 1),
    (13, 8, 'sites-available', 'content 13', 1),
    (14, 4, 'roland', 'content 14', 1),
    (15, 4, 'albert', 'content 15', 1),
    (16, 6, 'bin', 'content 16', 1),
    (17, 6, 'src', 'content 17', 1),
    (18, 6, 'share', 'content 18', 1),
    (19, 7, 'backups', 'content 19', 1),
    (20, 7, 'cache', 'content 20', 1),
    (21, 7, 'www', 'content 21', 1),
    (22, 21, 'project1', 'content 22', 1),
    (23, 22, 'app', 'content 23', 1),
    (24, 22, 'log', 'content 24', 1),
    (25, 22, 'vendor', 'content 25', 1),
    (26, 22, 'public', 'content 26', 1),
    (27, 25, 'bin', 'content 27', 1),
    (28, 25, 'composer', 'content 28', 1);



WITH RECURSIVE tree_path (id, parentId, title, path) AS
(
  SELECT id, parentId, title as title, CONCAT(title, '/') as path
    FROM Note
    WHERE parentId = 0
  UNION ALL
  SELECT t.id, t.parentId, t.title, CONCAT(tp.path, t.title, '/')
    FROM tree_path AS tp JOIN Note AS t
      ON tp.id = t.parentId
)
SELECT * FROM tree_path
ORDER BY path; 
