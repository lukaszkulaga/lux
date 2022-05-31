<?php

namespace App\Controller;

class UserAuthentication
{

    public function checkAuthentication() {

      return [];

    }

//        public function checkAuthentication ( $login,$password ) {
//
//        $result = $this->findOneBy(array( 'userName'=> $login,'password'=>$password ));
//
//        if ( $result ) {
//
//            $role = $result->getRole();
//            $id = $result->getIdUser();
//
//            if ( $role == 2 ) {
//
//                $this->session->start();
//                $this->session->set('user',$id);
//                $this->session->set('userName',$login);
//
//                return $result;
//            }
//            if ( $role == 1 ) {
//
//                $this->session->start();
//                $this->session->set('admin',$id);
//                $this->session->set('userName',$login);
//
//                return $result;
//            }
//        } else {
//            return false;
//        }
//    }

}

?>