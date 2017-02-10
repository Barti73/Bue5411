cd \
d:

cd wamp\www\HeroGym
cd src\AppBundle\Resources\config\doctrine
del *.* /Q

cd \
cd wamp\www\HeroGym
cd src\AppBundle\Entity
del *.* /Q


cd \
cd wamp\www\HeroGym
php app/console doctrine:mapping:import --force AppBundle xml
pause

cd \
cd wamp\www\HeroGym
php app/console doctrine:generate:entities AppBundle
pause